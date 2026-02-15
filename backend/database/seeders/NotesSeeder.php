<?php

namespace Database\Seeders;

use App\Models\Note;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class NotesSeeder extends Seeder
{
    public function run(): void
    {
        $csvFile = database_path('seeders/notes.csv');

        if (!File::exists($csvFile)) {
            $this->command->error('Arquivo notes.csv não encontrado!');
            return;
        }

        Note::truncate();

        $file = fopen($csvFile, 'r');

        fgetcsv($file);

        $count = 0;
        while (($row = fgetcsv($file)) !== false) {
            try {
                Note::create([
                    'site' => $row[1],
                    'equipment' => $row[2],
                    'variable' => $row[3],
                    'timestamp' => $row[4],
                    'author' => $row[5],
                    'message' => $row[6],
                ]);
                $count++;
            } catch (\Exception $e) {
                $this->command->error('Erro na linha ' . ($count + 1) . ': ' . $e->getMessage());
            }
        }

        fclose($file);
        $this->command->info("$count notas importadas com sucesso!");
    }
}

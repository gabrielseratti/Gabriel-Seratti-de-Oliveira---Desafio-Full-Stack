<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class NoteFactory extends Factory
{
    public function definition(): array
    {
        return [
            'site' => fake()->company(),
            'equipment' => fake()->randomElement(['Gerador', 'Transformador', 'Multimedidor']),
            'variable' => fake()->randomElement(['Tensão', 'Corrente']),
            'timestamp' => fake()->dateTimeBetween('-1 year', 'now'),
            'author' => fake()->name(),
            'message' => fake()->paragraph(),
        ];
    }
}
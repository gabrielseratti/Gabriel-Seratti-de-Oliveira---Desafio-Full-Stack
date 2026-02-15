<?php

namespace Tests\Unit;

use App\Models\Note;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class NoteModelTest extends TestCase
{
    use RefreshDatabase;

    public function test_note_can_be_created(): void
    {
        $note = Note::factory()->create([
            'site' => 'Test Site',
            'equipment' => 'Gerador',
        ]);

        $this->assertInstanceOf(Note::class, $note);
        $this->assertEquals('Test Site', $note->site);
        $this->assertEquals('Gerador', $note->equipment);
    }

    public function test_timestamp_is_cast_to_datetime(): void
    {
        $note = Note::factory()->create();

        $this->assertInstanceOf(\Illuminate\Support\Carbon::class, $note->timestamp);
    }

    public function test_fillable_attributes(): void
    {
        $note = new Note();

        $expectedFillable = [
            'site',
            'equipment',
            'variable',
            'timestamp',
            'author',
            'message',
        ];

        $this->assertEquals($expectedFillable, $note->getFillable());
    }

    public function test_uses_uuid_for_primary_key(): void
    {
        $note = Note::factory()->create();

        $this->assertMatchesRegularExpression(
            '/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i',
            $note->id
        );
    }
}

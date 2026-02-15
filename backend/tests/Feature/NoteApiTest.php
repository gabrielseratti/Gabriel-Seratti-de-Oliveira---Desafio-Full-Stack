<?php

namespace Tests\Feature;

use App\Models\Note;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NoteApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_list_notes(): void
    {
        Note::factory()->count(5)->create();

        $response = $this->getJson('/api/v1/notes');

        $response->assertStatus(200)
            ->assertJsonStructure([
                'current_page',
                'data' => [
                    '*' => [
                        'id',
                        'site',
                        'equipment',
                        'variable',
                        'timestamp',
                        'author',
                        'message',
                    ]
                ],
                'total',
                'per_page',
            ]);
    }

    public function test_can_filter_notes_by_site(): void
    {
        Note::factory()->create(['site' => 'Site A']);
        Note::factory()->create(['site' => 'Site B']);

        $response = $this->getJson('/api/v1/notes?site=Site A');

        $response->assertStatus(200);
        $this->assertEquals(1, count($response->json('data')));
        $this->assertEquals('Site A', $response->json('data.0.site'));
    }

    public function test_can_create_note_with_valid_data(): void
    {
        $noteData = [
            'site' => 'Test Site',
            'equipment' => 'Gerador',
            'variable' => 'Tensão',
            'timestamp' => '2024-08-01T10:00:00Z',
            'author' => 'Test Author',
            'message' => 'This is a test message with sufficient length',
        ];

        $response = $this->postJson('/api/v1/notes', $noteData);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Nota criada com sucesso',
            ]);

        $this->assertDatabaseHas('notes', [
            'site' => 'Test Site',
            'equipment' => 'Gerador',
        ]);
    }

    public function test_cannot_create_note_with_invalid_data(): void
    {
        $invalidData = [
            'site' => 'AB',
            'equipment' => 'Invalid',
            'variable' => 'Tensão',
            'timestamp' => '2024-08-01T10:00:00Z',
            'author' => 'A',
            'message' => 'Short',
        ];

        $response = $this->postJson('/api/v1/notes', $invalidData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['site', 'equipment', 'author', 'message']);
    }

    public function test_can_update_note(): void
    {
        $note = Note::factory()->create(['message' => 'Original message']);

        $response = $this->putJson("/api/v1/notes/{$note->id}", [
            'message' => 'Updated message with sufficient length',
        ]);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Nota atualizada com sucesso',
            ]);

        $this->assertDatabaseHas('notes', [
            'id' => $note->id,
            'message' => 'Updated message with sufficient length',
        ]);
    }

    public function test_can_delete_note(): void
    {
        $note = Note::factory()->create();

        $response = $this->deleteJson("/api/v1/notes/{$note->id}");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Nota deletada com sucesso',
            ]);

        $this->assertDatabaseMissing('notes', [
            'id' => $note->id,
        ]);
    }

    public function test_returns_404_for_nonexistent_note(): void
    {
        $response = $this->getJson('/api/v1/notes/99999999-9999-9999-9999-999999999999');

        $response->assertStatus(404)
            ->assertJson([
                'success' => false,
                'message' => 'Nota não encontrada',
            ]);
    }
}

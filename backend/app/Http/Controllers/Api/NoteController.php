<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreNoteRequest;
use App\Http\Requests\UpdateNoteRequest;
use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    public function index(Request $request)
    {
        $query = Note::query();

        if ($request->has('site') && $request->site !== '') {
            $query->where('site', 'LIKE', '%' . $request->site . '%');
        }

        if ($request->has('equipment') && $request->equipment !== '') {
            $query->where('equipment', 'LIKE', '%' . $request->equipment . '%');
        }

        if ($request->has('startDate') && $request->has('endDate')) {
            $query->whereBetween('timestamp', [
                $request->startDate,
                $request->endDate
            ]);
        }

        $perPage = $request->get('per_page', 5); // Default 5, ou o que vier
        $notes = $query->orderBy('timestamp', 'desc')->paginate($perPage);

        return response()->json($notes);
    }

    public function store(StoreNoteRequest $request)
    {
        $note = Note::create($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Nota criada com sucesso',
            'data' => $note
        ], 201);
    }

    public function show(string $id)
    {
        $note = Note::find($id);

        if (!$note) {
            return response()->json([
                'success' => false,
                'message' => 'Nota não encontrada'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $note
        ]);
    }

    public function update(UpdateNoteRequest $request, string $id)
    {
        $note = Note::find($id);

        if (!$note) {
            return response()->json([
                'success' => false,
                'message' => 'Nota não encontrada'
            ], 404);
        }

        $note->update($request->validated());

        return response()->json([
            'success' => true,
            'message' => 'Nota atualizada com sucesso',
            'data' => $note
        ]);
    }

    public function destroy(string $id)
    {
        $note = Note::find($id);

        if (!$note) {
            return response()->json([
                'success' => false,
                'message' => 'Nota não encontrada'
            ], 404);
        }

        $note->delete();

        return response()->json([
            'success' => true,
            'message' => 'Nota deletada com sucesso'
        ]);
    }
}
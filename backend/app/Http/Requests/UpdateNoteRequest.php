<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateNoteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'site' => 'sometimes|string|max:255|min:3',
            'equipment' => 'sometimes|string|max:255|in:Gerador,Transformador,Multimedidor',
            'variable' => 'sometimes|string|max:255|in:Tensão,Corrente',
            'timestamp' => 'sometimes|date|before_or_equal:now',
            'author' => 'sometimes|string|max:255|min:3',
            'message' => 'sometimes|string|min:10|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'site.min' => 'O site deve ter no mínimo 3 caracteres.',
            'equipment.in' => 'O equipamento deve ser: Gerador, Transformador ou Multimedidor.',
            'variable.in' => 'A variável deve ser: Tensão ou Corrente.',
            'timestamp.before_or_equal' => 'A data não pode ser no futuro.',
            'author.min' => 'O autor deve ter no mínimo 3 caracteres.',
            'message.min' => 'A mensagem deve ter no mínimo 10 caracteres.',
            'message.max' => 'A mensagem deve ter no máximo 1000 caracteres.',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'success' => false,
            'message' => 'Erro de validação',
            'errors' => $validator->errors()
        ], 422));
    }
}
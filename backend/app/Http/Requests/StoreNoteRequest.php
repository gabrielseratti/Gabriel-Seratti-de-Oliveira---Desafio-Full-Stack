<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreNoteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'site' => 'required|string|max:255|min:3',
            'equipment' => 'required|string|max:255|in:Gerador,Transformador,Multimedidor',
            'variable' => 'required|string|max:255|in:Tensão,Corrente',
            'timestamp' => 'required|date|before_or_equal:now',
            'author' => 'required|string|max:255|min:3',
            'message' => 'required|string|min:10|max:1000',
        ];
    }

    public function messages(): array
    {
        return [
            'site.required' => 'O campo site é obrigatório.',
            'site.min' => 'O site deve ter no mínimo 3 caracteres.',
            'equipment.required' => 'O campo equipamento é obrigatório.',
            'equipment.in' => 'O equipamento deve ser: Gerador, Transformador ou Multimedidor.',
            'variable.required' => 'O campo variável é obrigatório.',
            'variable.in' => 'A variável deve ser: Tensão ou Corrente.',
            'timestamp.required' => 'O campo data é obrigatório.',
            'timestamp.before_or_equal' => 'A data não pode ser no futuro.',
            'author.required' => 'O campo autor é obrigatório.',
            'author.min' => 'O autor deve ter no mínimo 3 caracteres.',
            'message.required' => 'O campo mensagem é obrigatório.',
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
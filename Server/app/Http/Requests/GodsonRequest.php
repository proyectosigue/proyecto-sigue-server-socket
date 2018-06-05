<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Contracts\Validation\Validator;

class GodsonRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */

    public function rules()
    {
        return [
            'first_name' => 'required',
            'last_name' => 'required',
            'orphan_house_id' => 'required',
            'age' => 'required'
        ];
    }

    public function messages()
    {
        return [
            'first_name.required' => 'Escriba el nombre del ahijado',
            'last_name.required' => 'Escriba el apellido',
            'orphan_house_id.required' => 'Especifique una casa hogar',
            'age.required' => 'Especifique la edad del ahijado'
        ];
    }

    public function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json(['status' => 'Error',
            'messages' => $this->formattedValidatorErrorsArray($validator)]), 422);
    }

    private function formattedValidatorErrorsArray($validator)
    {
        foreach ($validator->errors()->toArray() as $error) {
            $errors[] = $error;
        }
        return $errors;
    }

}

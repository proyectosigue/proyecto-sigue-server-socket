<?php

namespace App\Http\Traits;

class APIResponse {

    public static function success($body_message = null, $status = 'success', $header_message = 'Éxito'){
        return [
            'status' => $status,
            'header_message' => $header_message,
            'body_message' => $body_message
        ];
    }

    public static function error($errors, $debug_message,
                                 $status = 'error',
                                 $header_message = 'Error',
                                 $body_message = 'Hubo un error con el servidor'){
        return [
            'errors' => $errors,
            'status' => $status,
            'debug_message' => $debug_message,
            'header_message' => $header_message,
            'body_message' => $body_message
        ];
    }

}
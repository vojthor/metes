<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class ApiController extends Controller {
    /**
     * @var \Illuminate\Http\Request $request
     */
    protected $request;

    /**
     * ApiController constructor.
     * @param \Illuminate\Http\Request $request
     */
    function __construct(Request $request) {
        $this->request = $request;
    }

    /**
     * @param mixed $data
     * @param integer $statusCode
     * @param array $headers
     * @return mixed|string
     */
    protected function respond($data, $statusCode = 200, $headers = []) {
            return response()->json($data, $statusCode, $headers);
    }
}

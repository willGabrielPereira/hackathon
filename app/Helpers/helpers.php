<?

use App\Exceptions\ApiException;
use Illuminate\Support\Facades\Validator;

if (!function_exists('validateOrFail')) {
    function validateOrFail($validations, $request = [])
    {
        if (!$request) $request = request()->all();

        $validator = Validator::make($request, $validations);

        if ($validator->fails()) {
            throw new ApiException($validator->errors()->getMessages(), $request);
        }

        return $validator;
    }
}

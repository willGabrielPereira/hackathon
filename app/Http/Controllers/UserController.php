<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Spatie\QueryBuilder\QueryBuilder;

class UserController extends Controller
{
    private $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function index()
    {
        $instance = $this->user;

        return QueryBuilder::for(User::class)
            ->allowedFilters($instance->getFillable())
            ->allowedSorts($instance->getFillable())
            ->paginate()
            ->appends(request()->query());
    }

    public function me(Request $request)
    {
        return $request->user();
    }

    public function show()
    {
        return $this->user->all();
    }

    public function update(Request $request, User $user)
    {
        $user->fill($request->all());

        validateOrFail([
            'name' => 'required',
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($user->id)
            ],
            'password' => 'prohibited',
            'superior_id' => 'exists:App\Models\User,id'
        ], $user->toArray());

        $user->save();

        return response()->json($user);
    }

    public function create(Request $request)
    {
        $validator = validateOrFail([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8|confirmed',
        ]);

        $user = User::create($validator->valid());

        $token = $user->createToken('token')->plainTextToken;

        return response()->json(['token' => $token]);
    }

    public function destroy(Request $request, User $user)
    {
        dd($user);
    }
}

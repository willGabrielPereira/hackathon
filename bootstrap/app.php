<?php

use App\Exceptions\ApiException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Validation\ValidationException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        // web: __DIR__.'/../routes/web.php', // Added to app/Providers/RouteServiceProvider.php
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {})
    ->withExceptions(function (Exceptions $exceptions) {
        $exceptions->stopIgnoring(ValidationException::class);
        $exceptions->stopIgnoring(AuthorizationException::class);
        $exceptions->stopIgnoring(AuthenticationException::class);

        $exceptions->renderable(function (Throwable $e, $request) {
            
            if ($e instanceof ApiException)
                return response()->json($e->getErrors(),  $e->getCode() ?: 400);

            dd($e);

            return true;
        });
    })->create();

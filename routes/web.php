<?php

use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/',  [ProductController::class, 'index'])->name('dashboard');
Route::get('/product/{product}',  [ProductController::class, 'show'])->name('product.show');



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

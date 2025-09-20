<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductListResource;
use App\Http\Resources\ProductResource;
use App\Models\Product;

use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::query()->published()->paginate(12);
        return Inertia::render('welcome', ['products' => ProductListResource::collection($products)]);
    }

    public function show(Product $product)
    {
        $variationOptions = request('options', []);
        return Inertia::render('product-show', ['product' => new ProductResource($product) , 'variationOptions' => $variationOptions]);
    }
}

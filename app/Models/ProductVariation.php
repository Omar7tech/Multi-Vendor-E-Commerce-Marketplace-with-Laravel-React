<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVariation extends Model
{
   public $timestamps = false;

    protected $casts = [
         'variation_type_options_ids' => 'json',
    ];
}

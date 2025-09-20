<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;
use App\Enums\ProductStatusEnum;
use Illuminate\Database\Eloquent\Attributes\Scope;
use Illuminate\Database\Eloquent\Builder;
class Product extends Model implements \Spatie\MediaLibrary\HasMedia
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory, HasSlug, SoftDeletes;
    use InteractsWithMedia;
    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('title')
            ->saveSlugsTo('slug');
    }



    public function getRouteKeyName()
    {
        return 'slug';
    }

    protected $guarded = [];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function department()
    {
        return $this->belongsTo(Department::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function variationTypes()
    {
        return $this->hasMany(VariationType::class);
    }

    public function variations()
    {
        return $this->hasMany(ProductVariation::class, 'product_id');
    }

    protected static function booted(): void
    {

        static::creating(function (Product $product) {

            $product->created_by = auth()->id();
            $product->updated_by = auth()->id();
        });

    }

    protected function casts(): array
    {
        return [

            'status' => ProductStatusEnum::class,
        ];
    }


    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumb')
            ->width(100);

        $this->addMediaConversion('small')
            ->width(480);

        $this->addMediaConversion('large')
            ->width(1200);
    }

    #[Scope]
    protected function published(Builder $query): void
    {
        $query->where('status', ProductStatusEnum::PUBLISHED->value);
    }

    #[Scope]
    protected function draft(Builder $query): void
    {
        $query->where('status', ProductStatusEnum::DRAFT->value);
    }
    #[Scope]
    protected function forVendor(Builder $query): void
    {
        $query->where('created_by', auth()->id());
    }

}

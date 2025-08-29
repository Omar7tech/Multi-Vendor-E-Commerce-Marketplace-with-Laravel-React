<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Schemas\Schema;

class ProductInfolist
{
    public static function configure(Schema $schema): Schema
    {
        /* Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('title' , 2000);
            $table->string('slug' , 2000)->unique();
            $table->longText('description')->nullable();
            $table->foreignId('category_id')->index()->constrained('categories')->onDelete('cascade');
            $table->foreignId('department_id')->index()->constrained('departments')->onDelete('cascade');
            $table->string('status')->index();
            $table->decimal('price', 10, 4)->default(0);
            $table->integer('quantity')->default(0);
            $table->foreignIdFor(App\Models\User::class, 'created_by')->constrained('users')->onDelete('cascade');
            $table->foreignIdFor(App\Models\User::class, 'updated_by')->constrained('users')->onDelete('cascade');
            $table->softDeletes('deleted_at', precision: 0);
            $table->timestamps();
        }); */
        return $schema
            ->components([

               

            ]);
    }
}

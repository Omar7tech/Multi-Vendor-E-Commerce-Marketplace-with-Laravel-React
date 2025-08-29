<?php

namespace Database\Factories;

use App\Models\Department;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        /* $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->Integer('order')->default(0);
            $table->foreignId('department_id')->index()->constrained('departments')->onDelete('cascade');
            $table->foreignId('parent_id')->nullable()->constrained('categories')->onDelete('cascade');
            $table->boolean('is_active')->default(true);
            $table->timestamps(); */

        return [
            'name' => $this->faker->word(),
            'department_id' => Department::inRandomOrder()->first()->id,
            'is_active' => $this->faker->boolean(80), // 80% chance of being true
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}

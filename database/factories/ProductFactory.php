<?php

namespace Database\Factories;

use App\Enums\ProductStatusEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {


        $department = \App\Models\Department::has('categories')->inRandomOrder()->first();
        $category = $department->categories()->inRandomOrder()->first();
        $statusChoices = [ProductStatusEnum::DRAFT->value, ProductStatusEnum::PUBLISHED->value];

        return [
            'title' => $this->faker->word(),
            'description' => $this->faker->paragraph(),
            'department_id' => ((int) $department->id),
            'category_id' => ((int) $category->id),
            'status' => $this->faker->randomElement($statusChoices),
            'price' => $this->faker->randomFloat(4, 1, 1000),
            'quantity' => $this->faker->numberBetween(0, 100),
            'created_by' => 2,
            'updated_by' => 2,
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}

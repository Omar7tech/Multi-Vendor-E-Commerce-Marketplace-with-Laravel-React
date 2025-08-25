<?php

namespace Database\Seeders;

use App\Enums\RolesEnum;
use App\Models\User;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'user',
            'email' => 'user@example.com',
            'password' => 'secret',
        ])->assignRole(RolesEnum::USER->value);

        User::factory()->create([
            'name' => 'vendor',
            'email' => 'vendor@example.com',
            'password' => 'secret',
        ])->assignRole(RolesEnum::VENDOR->value);

        User::factory()->create([
            'name' => 'admin',
            'email' => 'admin@example.com',
            'password' => 'secret',
        ])->assignRole(RolesEnum::ADMIN->value);

    }
}

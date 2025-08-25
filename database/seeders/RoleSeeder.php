<?php

namespace Database\Seeders;

use App\PermissionsEnum;
use App\RolesEnum;
use App\Security\RolesAndPermissions;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RolesAndPermissions::seed();
    }
}

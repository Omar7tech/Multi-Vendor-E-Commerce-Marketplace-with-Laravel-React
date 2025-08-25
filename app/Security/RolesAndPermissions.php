<?php
namespace App\Security;


use App\Enums\PermissionsEnum;
use App\Enums\RolesEnum;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesAndPermissions
{
    public static function seed(): void
    {
        $userRole   = Role::firstOrCreate(['name' => RolesEnum::USER->value]);
        $vendorRole = Role::firstOrCreate(['name' => RolesEnum::VENDOR->value]);
        $adminRole  = Role::firstOrCreate(['name' => RolesEnum::ADMIN->value]);

        $approveVendors = Permission::firstOrCreate(['name' => PermissionsEnum::ApproveVendors->value]);
        $buyProducts    = Permission::firstOrCreate(['name' => PermissionsEnum::BuyProducts->value]);
        $sellProducts   = Permission::firstOrCreate(['name' => PermissionsEnum::SellProducts->value]);

        $userRole->syncPermissions([$buyProducts]);
        $vendorRole->syncPermissions([$sellProducts]);
        $adminRole->syncPermissions([$approveVendors, $buyProducts, $sellProducts]);
    }
}

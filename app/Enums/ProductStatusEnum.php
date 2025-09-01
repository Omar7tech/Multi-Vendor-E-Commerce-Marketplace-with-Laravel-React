<?php

namespace App\Enums;
use Filament\Support\Contracts\HasIcon;
use Filament\Support\Contracts\HasLabel;
use Filament\Support\Contracts\HasDescription;

use Filament\Support\Contracts\HasColor;
use Illuminate\Support\Str;
enum ProductStatusEnum: string implements HasLabel, HasDescription, HasColor , HasIcon
{
    case DRAFT = 'draft';
    case PUBLISHED = 'published';

    public static function labels(): string
    {
        return [
            self::DRAFT->value => 'Draft',
            self::PUBLISHED->value   => 'Published',
        ];
    }



    public function getLabel(): ?string
    {
        return Str::title($this->value);
    }

    public function getDescription(): ?string
    {
        return match ($this) {
            self::DRAFT => 'This has not finished being written yet.',
            self::PUBLISHED => 'This has been approved by a staff member and is public on the website.',
        };
    }

    public function getColor(): string|array|null
    {
        return match ($this) {
            self::DRAFT => 'gray',
            self::PUBLISHED => 'success',
        };
    }

    public function getIcon(): ?string
    {
        return match ($this) {
            self::DRAFT => 'heroicon-m-pencil',
            self::PUBLISHED => 'heroicon-m-check',
        };
    }



}

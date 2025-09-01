<?php

namespace App\Enums;

use Illuminate\Support\Str;

enum ProductVariationTypeEnum: string
{
    case SElECT = 'select';
    case RADIO = 'radio';
    case IMAGE = 'image';

    public static function labels(): string
    {
        return [
            self::SElECT->value => 'Select',
            self::RADIO->value => 'Radio',
            self::IMAGE->value => 'Image',
        ];
    }
    public function getLabel(): ?string
    {
        return Str::title($this->value);
    }
}

<?php

namespace App\Filament\Resources\Products\Pages;

use App\Filament\Resources\Products\ProductResource;

use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Resources\Pages\EditRecord;
use Filament\Schemas\Schema;
use BackedEnum;

class ProductImages extends EditRecord
{
    protected static string $resource = ProductResource::class;
    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-user-group';

    protected static ?string $pluralModelLabel = 'Images';
    protected static ?string $modelLabel = 'Image';




    public static function getNavigationLabel(): string
    {
        return 'Edit Images';
    }






    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                SpatieMediaLibraryFileUpload::make('images')
                    ->image()
                    ->imageEditor()
                    ->multiple()
                    ->openable()
                    ->deletable()
                    ->panelLayout('grid')
                    ->collection('images')
                    ->reorderable()
                    ->directory('products/images/{record->slug}')
                    ->appendFiles()
                    ->disk('public')
                    ->columnSpan('2')
            ]);
    }
}

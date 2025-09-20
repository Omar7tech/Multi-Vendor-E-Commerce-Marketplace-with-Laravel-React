<?php

namespace App\Filament\Resources\Products\Pages;

use App\Filament\Resources\Products\ProductResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Pages\EditRecord;
use Filament\Schemas\Schema;
use BackedEnum;

class ProductVariationTypes extends EditRecord
{
    protected static string $resource = ProductResource::class;
    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-rectangle-group';

    protected static ?string $pluralModelLabel = 'Products Variation Types';
    protected static ?string $modelLabel = 'Variation Type';




    public static function getNavigationLabel(): string
    {
        return 'Edit Variation Types';
    }







    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Repeater::make('variationTypes')
                    ->relationship()
                    ->collapsible()
                    ->defaultItems(1)
                    ->addActionLabel('Add New Variation Type')
                    ->columns(2)
                    ->columnSpan(2)
                    ->schema([
                        TextInput::make('name')
                            ->required(),

                        Select::make('type')
                            ->options(\App\Enums\ProductVariationTypeEnum::class)
                            ->required(),

                        Repeater::make('options')
                            ->relationship()
                            ->collapsible()

                            ->addActionLabel('Add New Option')
                            ->schema([
                                TextInput::make('name')
                                    ->required()
                                    ->columnSpan(2),
                                    SpatieMediaLibraryFileUpload::make('images')
                                    ->collection('images')
                                    ->multiple()
                                    ->openable()
                                    ->deletable()
                                    ->panelLayout('grid')
                                    ->reorderable()
                                    ->appendFiles()
                                    ->disk('public')
                                    ->image(),
                            ])->columnSpan("full")

                    ])
            ]);
    }
}

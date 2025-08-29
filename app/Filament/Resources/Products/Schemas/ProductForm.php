<?php

namespace App\Filament\Resources\Products\Schemas;

use App\Enums\ProductStatusEnum;
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {

        return $schema
            ->components([
                Section::make('Product Details')
                    ->description('Basic information about the product')
                    ->schema([
                        Grid::make(1)->schema([
                            TextInput::make('title')
                                ->label('Product Title')
                                ->required()
                                ->maxLength(2000)
                                ->placeholder('e.g. Awesome Product'),

                            MarkdownEditor::make('description')
                                ->toolbarButtons([
                                    ['bold', 'italic', 'strike', 'link'],
                                    ['heading'],
                                    ['table'],
                                    ['blockquote', 'bulletList', 'orderedList'],
                                    ['undo', 'redo'],
                                ])
                                ->label('Product Description'),

                            TextInput::make('price')
                                ->label('Price')
                                ->required()
                                ->numeric()
                                ->minValue(0)
                                ->placeholder('e.g. 99.99'),

                            TextInput::make('quantity')
                                ->label('Quantity')
                                ->required()
                                ->numeric()
                                ->minValue(0)
                                ->placeholder('e.g. 100'),

                            Select::make('status')
                                ->options(
                                    ProductStatusEnum::class
                                )
                                ->label('Status')
                                ->required()
                                ->default(ProductStatusEnum::DRAFT->value)
                                ->native(false),
                        ]),
                    ]),

                Section::make('Relations')
                    ->description('Department and Category')
                    ->schema([
                        Grid::make(1)->schema([

                            Select::make('department_id')
                                ->label('Department')
                                ->relationship('department', 'name')
                                ->required()
                                ->preload()
                                ->searchable()
                                ->native(false)
                                ->placeholder('Select a department')
                                ->reactive(), // 👈 makes changes available to other fields

                            Select::make('category_id')
                                ->label('Category')
                                ->options(function ($get) {
                                    $departmentId = $get('department_id');
                                    if (!$departmentId) {
                                        return []; // no department selected → no categories
                                    }

                                    return \App\Models\Category::where('department_id', $departmentId)
                                        ->pluck('name', 'id');
                                })
                                ->required()
                                ->searchable()
                                ->preload()
                                ->native(false)
                                ->placeholder('Select a category')
                                ->disabled(fn($get) => !$get('department_id')), // 👈 disabled until department selected
                        ]),
                    ]),

            ]);
    }
}

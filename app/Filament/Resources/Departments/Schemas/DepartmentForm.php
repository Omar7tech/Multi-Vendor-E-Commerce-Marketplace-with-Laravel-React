<?php

namespace App\Filament\Resources\Departments\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class DepartmentForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Department Details')
                ->description('Basic information about the department')
                ->schema([
                    Grid::make(1)->schema([
                        TextInput::make('name')
                            ->label('Department Name')
                            ->required()
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn($state, callable $set) => $set('slug', \Str::slug($state)))

                            ->placeholder('e.g. Human Resources'),
                        TextInput::make('slug')
                            ->label('Slug')
                            ->disabled()
                            ->placeholder('e.g. human-resources'),
                        Toggle::make('is_active')
                            ->label('Active')
                            ->required()->default(true),
                    ]),
                ]),

            Section::make('SEO Settings')
                ->description('Meta information for search engines')
                ->collapsible()
                ->schema([

                    TextInput::make('meta_title')
                        ->label('Meta Title')
                        ->placeholder('e.g. HR Department Overview'),
                    Textarea::make('meta_description')
                        ->label('Meta Description')
                        ->rows(4)
                        ->placeholder('Brief description for SEO...'),

                ]),
        ]);
    }
}

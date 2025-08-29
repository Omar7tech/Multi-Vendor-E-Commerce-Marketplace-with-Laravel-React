<?php

namespace App\Filament\Resources\Products\Tables;

use App\Enums\ProductStatusEnum;
use Filament\Tables\Enums\PaginationMode;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Actions\RestoreBulkAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\BadgeColumn;
use Filament\Tables\Columns\SelectColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class ProductsTable
{
    public static function configure(Table $table): Table
    {

        /*  $table->id();
            $table->string('title' , 2000);
            $table->longText('description')->nullable();
            $table->foreignId('category_id')->index()->constrained('categories')->onDelete('cascade');
            $table->foreignId('department_id')->index()->constrained('departments')->onDelete('cascade');
            $table->string('status')->index();
            $table->decimal('price', 10, 4)->default(0);
            $table->integer('quantity')->default(0);
            $table->foreignIdFor(App\Models\User::class, 'created_by')->constrained('users')->onDelete('cascade');
            $table->foreignIdFor(App\Models\User::class, 'updated_by')->constrained('users')->onDelete('cascade');
            $table->softDeletes('deleted_at', precision: 0);
            $table->timestamps(); */
        return $table
        ->paginated([2, 25, 50, 100, 'all'])
->deferLoading()
            ->columns([
                TextColumn::make('title')
                    ->searchable()->sortable(),
                TextColumn::make('category.name')
                    ->searchable(),
                TextColumn::make('department.name')
                    ->searchable(),

                TextColumn::make('status')->badge()
                ,
                TextColumn::make('price')
                    ->searchable(),
                TextColumn::make('quantity')
                    ->searchable(),
                TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

            ])
            ->filters([
                TrashedFilter::make()->native(false),
                SelectFilter::make('status')
                    ->options(ProductStatusEnum::class)->native(false),

                    
                    SelectFilter::make('department_id')
                    ->label('Department')
                    ->searchable()
                    ->relationship('department', 'name')->native(false),

                    SelectFilter::make('category_id')
                    ->label('Category')
                    ->searchable()
                    ->relationship('category', 'name')->native(false),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                    ForceDeleteBulkAction::make(),
                    RestoreBulkAction::make(),
                ]),
            ]);
    }
}

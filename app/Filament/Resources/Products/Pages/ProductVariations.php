<?php

namespace App\Filament\Resources\Products\Pages;

use App\Filament\Resources\Products\ProductResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Resources\Pages\EditRecord;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use BackedEnum;
use Illuminate\Database\Eloquent\Model;

class ProductVariations extends EditRecord
{
    protected static string $resource = ProductResource::class;
    protected static string|BackedEnum|null $navigationIcon = 'heroicon-o-clipboard-document-list';

    protected static ?string $pluralModelLabel = 'Product Variation';
    protected static ?string $modelLabel = 'Variations';
    protected static ?string $title = 'Product Variations';





    public static function getNavigationLabel(): string
    {
        return 'Edit Product Variationsk';
    }







    public function form(Schema $schema): Schema
    {
        $types = $this->record->variationTypes;
        $fields = [];
        foreach ($types as $type) {
            $fields[] = Hidden::make('variation_type_' . ($type->id) . '.id');
            $fields[] = TextInput::make('variation_type_' . ($type->id) . '.name')->label($type->name)->disabled();
        }
        return $schema
            ->components([
                Repeater::make('variations')
                    ->deletable(false)
                    ->addable(false)
                    ->reorderable(false)
                    ->defaultItems(1)
                    ->schema([
                        Section::make()
                            ->schema($fields)->columns(3)->columnSpanFull(),
                        TextInput::make('quantity')
                            ->required()
                            ->numeric()
                            ->minValue(0)
                            ->columnSpan(1),
                        TextInput::make('price')
                            ->required()
                            ->numeric()
                            ->minValue(0)
                            ->columnSpan(1),
                    ])
                    ->columns(2)
                    ->columnSpan(2)
            ]);

    }

    protected function mutateFormDataBeforeFill(array $data): array
    {
        $variations = $this->record->variations->toArray();
        $data['variations'] = $this->mergeCartesianWithExisting($this->record->variationTypes, $variations);

        return $data;
    }

    private function mergeCartesianWithExisting($variationTypes, $existingData)
    {
        $defaultQuantity = $this->record->quantity ?? 0;
        $defaultPrice = $this->record->price ?? 0.00;
        $cartesianProduct = $this->cartesianProduct($variationTypes, $defaultQuantity, $defaultPrice);
        $mergeResult = [];

        foreach ($cartesianProduct as $product) {
            $optionsId = collect($product)->filter(
                fn($value, $key) => str_starts_with($key, 'variation_type_')
            )->map(fn($options) => $options['id'])->values()->toArray();
            $match = array_filter($existingData, function ($existingOption) use ($optionsId) {
                return $existingOption['variation_type_options_ids'] === $optionsId;
            });

            if (!empty($match)) {
                $existingEntry = reset($match);
                $product['id'] = $existingEntry['id'];
                $product['quantity'] = $existingEntry['quantity'];
                $product['price'] = $existingEntry['price'];
            } else {
                $product['quantity'] = $defaultQuantity;
                $product['price'] = $defaultPrice;
            }
            $mergeResult[] = $product;
        }
        return $mergeResult;
    }

    private function cartesianProduct($variationTypes, $defaultQuantity = null, $defaultPrice = null)
    {
        $result = [[]];

        foreach ($variationTypes as $index => $variationType) {
            $temp = [];
            foreach ($variationType->options as $option) {
                foreach ($result as $combination) {
                    $newCombination = $combination + [
                        'variation_type_' . ($variationType->id) => [
                            'id' => $option->id,
                            'name' => $option->name,
                            'label' => $variationType->name,
                        ],
                    ];

                    $temp[] = $newCombination;
                }
            }
            $result = $temp;
        }

        foreach ($result as &$combination) {
            if (count($combination) === count($variationTypes)) {
                $combination['quantity'] = $defaultQuantity;
                $combination['price'] = $defaultPrice;
            }
        }

        return $result;
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        $formattedData = [];
        foreach ($data['variations'] as $option) {
            $variationTypeOptionIds = [];

            foreach ($this->record->variationTypes as $i => $variationType) {
                $variationTypeOptionIds[] = $option['variation_type_' . ($variationType->id)]['id'];

            }
            $quantity = $option['quantity'] ?? $this->record->quantity ?? 0;
            $price = $option['price'] ?? $this->record->price ?? 0.00;
            $formattedData[] = [
                'variation_type_options_ids' => $variationTypeOptionIds,
                'quantity' => $quantity,
                'price' => $price,
            ];

        }
        $data['variations'] = $formattedData;
        return $data;
    }

    public function handleRecordUpdate(Model $record, array $data): Model
    {
        $variations = $data['variations'] ?? [];
        unset($data['variations']);
        $variations = collect($variations)->map(function ($variation) {
            return [
                'id' => $variation['id'] ?? null,
                'variation_type_options_ids' => json_encode($variation['variation_type_options_ids']),
                'quantity' => $variation['quantity'],
                'price' => $variation['price'],
            ];
        })->toArray();
        $record->variations()->upsert(
            $variations,
            ['id'],
            ['variation_type_options_ids', 'quantity', 'price']
        );

        return $record;

    }
}


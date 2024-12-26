import { CategoryButton } from "@/components/category-button";
import { Header } from "@/components/header";
import { FlatList, SectionList, Text, View } from "react-native";

import {CATEGORIES, MENU, ProductProps} from "@/utils/data/products"
import { useState, useRef } from "react";
import { Product } from "@/components/product";
import { Link } from "expo-router";
import { useCartStore } from "@/stores/cart-store";

export default function Home(){
    const cartStore = useCartStore()
    const [category, setCategory] = useState(CATEGORIES[0])

    const sectionListRef = useRef<SectionList<ProductProps>>(null)

    const cartQuantityItems = cartStore.products.reduce((total, product) => total + product.quantity, 0)

    function handleCategorySelect(selectedCategory: string){
        setCategory(selectedCategory)

        const sectionIndex = CATEGORIES.findIndex((category) => category === selectedCategory)

        if(sectionListRef.current){
            sectionListRef.current.scrollToLocation({
                animated: true,
                sectionIndex,
                itemIndex: 0
            })
        }
    }

    return (
        <View className="flex-1 pt-8">
            <Header title="Faça o seu pedido" cardQuantityItems={cartQuantityItems}/>

            <FlatList  
                className="max-h-10 mt-5"
                data={CATEGORIES}
                keyExtractor={(item) => item}
                horizontal
                showsHorizontalScrollIndicator = {false}
                contentContainerStyle={{gap: 12, paddingHorizontal: 20}}
                renderItem={({item}) => (
                    <CategoryButton 
                        title={item} 
                        onPress={() => handleCategorySelect(item)} 
                        isSelected={item == category}/>
            )}
            />

            <SectionList
                ref={sectionListRef}
                className="flex-1 p-5"
                sections={MENU}
                keyExtractor={(item) => item.id}
                stickySectionHeadersEnabled={false}            
                showsVerticalScrollIndicator = {false}
                contentContainerStyle={{paddingBottom: 100}}
                renderItem={({ item }) => (
                    <Link href={`/product/${item.id}`} asChild>
                      <Product data={item} />
                    </Link>
                  )}
                renderSectionHeader={({section: {title}}) => (
                    <Text className="text-xl text-white font-heading mt-8 mb-3">{title}</Text>
                )}
            />
        </View>
    )
}
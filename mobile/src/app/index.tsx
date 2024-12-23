import { CategoryButton } from "@/components/category-button";
import { Header } from "@/components/header";
import { FlatList, Text, View } from "react-native";

import {CATEGORIES} from "@/utils/data/products"

export default function Home(){
    return (
        <View className="flex-1 pt-8">
            <Header title="Faça o seu pedido" cardQuantityItems={1}/>

            <FlatList  
            className="max-h-10 mt-5"
            data={CATEGORIES}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator = {false}
            contentContainerStyle={{gap: 12, paddingHorizontal: 20}}
            renderItem={({item}) => (
                <CategoryButton title={item}/>
            )}
            />
        </View>
    )
}
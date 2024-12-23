import { Header } from "@/components/header";
import { Text, View } from "react-native";

export default function Home(){
    return (
        <View className="flex-1 pt-8">
            <Header title="Faça o seu pedido" cardQuantityItems={1}/>
        </View>
    )
}
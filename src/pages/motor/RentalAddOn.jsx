import React from "react";
import { View , StyleSheet , TouchableOpacity, Text} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const RentalAddOn = () => {
    






    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Icon name="bell-outline" size={24} style={styles.IconBell} />
                <Text style={styles.TextHead}>Thuê xe máy</Text>
            </View>
            <View>
                <View style={styles.MotorHead}>
                    <View style={styles.Img}><Text>ảnh xe</Text></View>
                    <View style={styles.MotorInf}>
                        <Text style={styles.TextNameMotor}>Ten xe</Text>
                        <Text style={styles.TextDescript}>Mo ta xe hmm....... </Text>
                    </View>
                </View>
                <Text>Thông tin cần nhập</Text>
                <TouchableOpacity><View style={styles.Button}>Chọn vị trí nhận xe</View></TouchableOpacity>
                <Text style={styles.TextDescript}>Vị trí nhận xe *</Text>
                <Text style={styles.TextDescript}>Thời gian thuê</Text>
            </View>
        </SafeAreaView>
    );
};




const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      header: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        backgroundColor: "#ccc"
      },
      TextHead: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        alignSelf: 'center',
        marginRight: 100,
      },
      MotorHead: {flexDirection: 'row', justifyContent: 'space-between'},
      Img: {width: 120, height: 120, backgroundColor: 'green'},
      MotorInf: { paddingTop: 10, justifyContent: 'flex_start', paddingRight: 120},
      TextNameMotor: { fontSize: 20, fontWeight: '600'},
      TextDescript: { color: '#A6A6A6'},
      Button: { backgroundColor: '#12B000', color: 'blue'},


})


export default RentalAddOn;
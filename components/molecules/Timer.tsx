import React, {useState} from "react";
import {View, Text, Button, StyleSheet} from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs, {type Dayjs} from 'dayjs';
import * as Notifications from 'expo-notifications';

const Timer = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });

    const handleAddTimer = async () => {
        console.log('Timer aggiunto per:', selectedDate);

        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Nuovo timer aggiunto',
                body: JSON.stringify(selectedDate)
            },
            trigger: null,
        });
    };

    return <>
        <Text style={styles.title}>Quale evento vuoi ricordare?</Text>
        <View style={styles.dateTimePicker}>
            <Button title="Seleziona Data e Ora" onPress={() => setIsDateTimePickerVisible(prev => !prev)}/>
            {isDateTimePickerVisible && (
                <DateTimePicker
                    onChange={(params) => setSelectedDate(params.date as Dayjs)}
                    date={selectedDate}
                    minDate={dayjs()}
                    locale="it"
                    mode="single"
                />
            )}
        </View>
        <Button title="Aggiungi Timer" onPress={handleAddTimer}/>
    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    dateTimePicker: {
        marginBottom: 20,
    },
});

export default Timer;

import React, {useState} from 'react';
import {Agenda} from 'react-native-calendars';

const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
};

const Week: React.FC = () => {
    const [items, setItems] = useState({});

    const loadItems = (day) => {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);
                if (!items[strTime]) {
                    items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 3 + 1);
                    for (let j = 0; j < numItems; j++) {
                        items[strTime].push({
                            name: 'Item for ' + strTime + ' #' + j,
                            height: Math.max(50, Math.floor(Math.random() * 150)),
                        });
                    }
                }
            }
            const newItems = {};
            Object.keys(items).forEach((key) => {
                newItems[key] = items[key];
            });
            setItems(newItems);
        }, 1000);
    };
    return (
        <Agenda
            style={{marginLeft:5 ,marginRight:5}}
            theme={{
                'stylesheet.calendar.header': {
                    header: {
                        justifyContent: 'flex-start',
                        marginTop: 6,
                        marginBottom: 10,
                        marginLeft: 15
                    },
                    monthText: {
                        fontSize: 22,
                        fontWeight: 'bold',
                        color:'#2F2E41'
                    },
                    dayHeader: {
                        marginTop: 10,
                        fontWeight: 'bold',
                        color: '#2F2E41'
                    }
                },
                todayBackgroundColor: '#FF975C',
                todayTextColor:'white',
                textDayFontWeight: 'bold',
                dayTextColor: '#2F2E41'
            }}
            hideArrows
            enableSwipeMonths
            items={items}
            loadItemsForMonth={loadItems}
            selected={'2022-04-15'}
            markedDates={{}}
        />
    );
};

export default Week;

import React, {useState, useEffect} from 'react';
import { SafeAreaView, View, Text, Image, FlatList, StyleSheet } from 'react-native';

const App = () => {
  const [customers, setCustomers] = useState([]);

  const getCustomers = async () => {
    try {
      const response = await fetch(`https://randomuser.me/api/?page=${Page}&results=10`);
      const data = await response.json();
      setCustomers(d => [...d, ...data.results]);
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View style={styles.box}>
        <Image style={styles.image} source={{uri: item.picture.large}} />
        <View style={styles.content}>
          <Text style={styles.name}>
            {`${item.name.title} ${item.name.first} ${item.name.last}`}
          </Text>
          <Text style={styles.address}>
            {`${item.location.street.number}, ${item.location.street.name}, ${item.location.city}`}
          </Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Text style={styles.header}>Customers</Text>
      <FlatList
        data={customers}
        renderItem={renderItem}
        keyExtractor={item => item.email}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: 'white',
    paddingHorizontal: 1,
    paddingVertical: 1,
  },
  header: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  box: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: 'white',
  },
  content: {
    justifyContent: 'space-around',
  },
  name: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 5,
    marginRight: 20,
  },
  address: {
    color: 'orange',
  },
  email: {
    color: 'red',
  },
});

export default App;
import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  FlatList,
  Pressable,
  Modal,
  Image
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App(props) {
  const [modalvisible, setmodalvisible] = useState(false)
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const [courseGoal, setCourseGoal] = useState([]);

  function modalvisbility() {
    setmodalvisible(true)
  }

  function notmodalvisbility() {
    setmodalvisible(false)
  }

  function goalTextInput(entered) {
    setEnteredGoalText(entered);
  }

  function goalListHandler() {
    setCourseGoal((currentGoals) =>
      [...currentGoals, enteredGoalText]);
    notmodalvisbility()
  }

  function goalDeleteHandler(index) {
    setCourseGoal((currentGoals) => {
      const updatedGoals = [...currentGoals];
      updatedGoals.splice(index, 1);
      return updatedGoals;
    });
  }

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.container}>
        <Button
          title="ADD NEW GOAL"
          color="#b180f0"
          onPress={modalvisbility} />
        {modalvisible &&
          <Modal visible={props.visible} animationType='slide'>
            <View style={styles.inputContainer}>
              <Image style={styles.img} source={require("./assets/image.png")} />
              <TextInput
                style={styles.txtInput}
                placeholder="Your Course Goal!"
                onChangeText={goalTextInput}
              />
              <View style={styles.btnview}>
                <View style={styles.button}>
                  <Button title="ADD GOAL"
                    color="#b180f0"
                    onPress={goalListHandler} />
                </View>
                <View style={styles.button}>
                  <Button title="CANCEL"
                    color="#f31282"
                    onPress={notmodalvisbility} />
                </View>
              </View>
            </View>
          </Modal>
        }
        <View style={styles.goalContainer}>
          <FlatList
            data={courseGoal}
            renderItem={({ item, index }) => (
              <Pressable android_ripple={{ color: '#210644' }} onPress={() => goalDeleteHandler(index)}>
                <Text style={styles.goalItem}>{item}</Text>
              </Pressable>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#1e085a"
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: '#1e085a'
  },
  txtInput: {
    borderWidth: 1,
    borderColor: '#e4d0ff',
    backgroundColor: '#e4d0ff',
    color: '#120438',
    borderRadius: 6,
    width: '100%',
    padding: 8,
  },
  goalContainer: {
    flex: 5,
    paddingTop: 5,
  },
  goalItem: {
    margin: 6,
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: 10,
    padding: 8,
  },
  btnview: {
    flexDirection: 'row',
    marginTop: 16,
  },
  button: {
    width: '40%',
    marginHorizontal: 10
  },
  img: {
    width: 100,
    height: 100,
    margin: 20
  }
});

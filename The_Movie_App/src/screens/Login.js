import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';


export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const navigation = useNavigation()
    const auth = getAuth();

    useEffect(()=>{
        onAuthStateChanged(auth, user => {
            console.log('onAuthStateChanged user', user)
            if(user){
                navigation.replace("Home")
            }else{
                console.log(user)
            }
        })
    },[])

    const handleSignUp = async () =>{
       try{
        const user = await createUserWithEmailAndPassword(auth, email, password);
        console.log(user)
        Toast.show({
            type : 'success',
            text1 : '회원가입 성공',
            text2 : `${email}으로 가입되었습니다.`

        })
       }catch(error){
        console.log(error.message)
        Alert.alert(
            "회원가입 도중에 문제가 생겼습니다.",
            error.message,
            [{text: '닫기' , onPress : () => console.log('닫기')} ],
            { cancelable : true }
        )
       }
    }

    const handleLogin = async () =>{
        try{
         const userCredential = await signInWithEmailAndPassword(auth, email, password)
         const user = userCredential.user
         console.log(userCredential)
         Toast.show({
            type : 'success',
            text1 : '로그인 성공',
            text2 : `${user.email} 님 반갑습니다.`

        })
        }catch(error){
            console.log(error)
            Alert.alert(
                "로그인 도중에 문제가 발생했습니다?",
                error.message,
                [{text : '닫기', onPress : ()=>console.log('닫기')}],
                { cancelable : true }
            )
        }
    }

  return (
    <View style={styles.container}>   
        <View style={styles.inputContainer}>
            <TextInput
                placeholder='이메일'
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            />
             <TextInput
                placeholder='비밀번호'
                value={password}
                onChangeText={text => setPassword(text)}
                style={styles.input}
                secureTextEntry={true}
            />
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>로그인</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.buttonOutline}
                onPress={handleSignUp}
            >
                <Text style={styles.buttonOutlineText}>회원가입</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        width: '80%',
        backgroundColor: '#ffffff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },
    input: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        color : '#000'
    },
    buttonContainer: {
        width: "50%",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30 
    },
    button: {
        backgroundColor: 'black',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#000000',
        borderWidth: 1,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16
    },
    buttonOutlineText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 16
    }
})

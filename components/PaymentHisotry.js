import React, { useState } from 'react';
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PaymentHisotry =()=> {
    const [visible, setVisible]= useState(false); 
  return (
   <>
   <View style={styles.main}> 

   <View style={styles.profile}>
  
      <Image style={styles.imge}/>
    

    <View style={styles.drinfo}>
   
       <Image source={require('../assets/pjh.png')}/> 
       

    </View>
    
     </View>

     <View style={styles.table}>

<Text style={styles.prtable}> Date </Text>
<Text style={styles.table1}> Total </Text>
<Text style={styles.table1}> Recieve</Text>
<Text style={styles.table1}> Due </Text>

 </View> 
 <View style={styles.line2}></View>


 <View>
        <TouchableOpacity onPress={()=>setVisible(true)}>
        <Image source={require('../assets/draft/dot.png')} style={styles.img}/>
        </TouchableOpacity>
        <Modal transparent visible={visible} animationType='fade'>
             {/* <SafeAreaView style={styles.modal} onTouchStart={()=> setVisible(false)}> */}
             <View style={styles.modal} >
              
           <TouchableOpacity onPress={()=> props.navigation.navigate("paymenthistory")} > 
              <Text style={styles.paymenthis}> Update Bill
               </Text> 
          </TouchableOpacity> 

<Text style={{margin:5, fontSize: 16, color:'#4F4F4F',fontWeight: '400', 
}}>   Text/Call </Text>
</View>
             {/* </SafeAreaView> */}

        </Modal>
     </View>

   </View>
   
   


   </>
  )
};

const styles = StyleSheet.create({


    main:{
        backgroundColor: 'white',
        flex: 1,
        width: "100%",
        height: 920,
        overflow: "hidden",
    },
    profile:{
        flexDirection: 'row',
        top: 20,
        left: 10,
     },

     imge:{

        width: 85,
        height: 85, 
        
        backgroundColor: 'lightgray',
        borderRadius: 50,
       padding: 10, 
   
   
   
   },
   drinfo:{
    top: 8,
    left: 3,
  },
  table:{
    flexDirection: 'row', 
    top: 70,
    left: 10, 
    
},
prtable:{
top: 17, 
},
table1:{
   left: 70, 
   margin: 16,
},
 
line2:{
   width: 330, 
top: 65,
left: 10, 
borderWidth: 0.8,
borderColor: '#AFD59F',


},
img:{
    top: 90,
    left: '90%', 

},
modal:{
    width: 150,
    height: 85,
    backgroundColor: '#FFF',
    elevation: 3, 
   top: '78%', 
   left: 170, 
   borderRadius: 6, 
   
}, 

 

});
export default PaymentHisotry;
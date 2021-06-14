import React from 'react';
import { View, Text, Image, ImageBackground, TextInput, ScrollView, KeyboardAvoidingView, Modal, StyleSheet } from "react-native";
import  * as commonStyle from '../../includes/main-style';
import { TouchableOpacity } from "react-native-gesture-handler"

const PP = props => {
	console.log(props)
	return (
		<View>
			<Modal
				animationType="slide"
				transparent={true}
				visible={props.modalVisible}
			>
				<View
					style={{
						height: '50%',
						marginTop: 'auto',
						backgroundColor: 'white',
						borderColor: 'black', borderTopLeftRadius: 30,
						borderTopRightRadius: 30,
						backgroundColor: commonStyle.themeColor(),
						padding: commonStyle.getModerateScale(14)
					}}>

					<View style={{ backgroundColor: commonStyle.themeColor(), flex: 1 }} kay={3}>

						<View style={{}}>
							<TouchableOpacity
								style={{ alignSelf: 'flex-end', padding: 3 }}
								onPress={() => {
									setModalVisible(false);
								}}>
								<Icon name='arrow-circle-o-down' size={22} color='white' style={{ alignSelf: 'flex-end' }} />
							</TouchableOpacity>
							<Text style={{ fontWeight: 'bold', fontSize: commonStyle.getModerateScale(18), color: 'white', alignSelf: 'center', textAlign: 'justify', textDecorationLine: 'underline' }}>Terms and Conditions</Text>

							<ScrollView showsVerticalScrollIndicator={false}>

								<Text style={{ fontWeight: '600', fontSize: commonStyle.getModerateScale(14), color: 'white', alignSelf: 'center', textAlign: 'justify', marginTop: commonStyle.getModerateScale(12) }} >
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel varius duis porta mauris nam nulla. Sit in urna tempus, sed suscipit natoque. Porttitor ac vitae hac facilisi eu sem posuere velit dui. Fermentum placerat nunc neque mattis non massa dui. Tincidunt porta velit eget et. Interdum dignissim id tristique ut vitae ut viverra. A cras facilisis malesuada erat.
									Sit et gravida ullamcorper elementum platea. Sagittis, tortor ut hac ornare morbi gravida varius. Tristique aliquam urna massa urna nunc, vel feugiat. Curabitur urna, sit sem non mollis sed in phasellus. Nullam nunc pellentesque elit et curabitur scelerisque. Pharetra faucibus ultrices ac at vestibulum lectus eget ultrices consequat. Mauris quisque neque, in non, risus. Sit id hendrerit pharetra eget fermentum, vulputate. Eget bibendum.
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vel varius duis porta mauris nam nulla. Sit in urna tempus, sed suscipit natoque. Porttitor ac vitae hac facilisi eu sem posuere velit dui. Fermentum placerat nunc neque mattis non massa dui. Tincidunt porta velit eget et. Interdum dignissim id tristique ut vitae ut viverra. A cras facilisis malesuada erat.
									Sit et gravida ullamcorper elementum platea. Sagittis, tortor ut hac ornare morbi gravida varius. Tristique aliquam urna massa urna nunc, vel feugiat. Curabitur urna, sit sem non mollis sed in phasellus. Nullam nunc pellentesque elit et curabitur scelerisque. Pharetra faucibus ultrices ac at vestibulum lectus eget ultrices consequat. Mauris quisque neque, in non, risus. Sit id hendrerit pharetra eget fermentum, vulputate. Eget bibendum.
								</Text>

							</ScrollView>

						</View>
					</View>

				</View>
			</Modal>
		</View>
	);
}
export default PP;

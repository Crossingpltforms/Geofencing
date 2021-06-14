import React, { useState, useEffect, useContext, createRef } from 'react'

import { useNetInfo } from "@react-native-community/netinfo";
import * as styled from "./style";
import { EdoutContext } from '../../context/index'

const Network = props => {
	const { state, dispatch } = useContext(EdoutContext)
	const netInfo = useNetInfo();
	console.log("netInfo=>",netInfo)
	
	useEffect(() => {
		dispatch({ type: "SET_NETWORK", payload: {network: netInfo.isConnected} })
	}, [netInfo.isConnected])
	return (
		<>
			{
				netInfo.isConnected == true ? (null) : (
					<styled.OfflineContainer>
						<styled.OfflineText>No Internet Connection</styled.OfflineText>
					</styled.OfflineContainer>
				)
			}
		</>
	);
}

export default Network;

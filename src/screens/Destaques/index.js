import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, ActivityIndicator, TextInput, ImageBackground, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

//dados da api
const baseURL = 'https://api.github.com';
//const searchTerm = '';//'react';
const perPage = 20;

Icon.loadFont();

export default class Destaques extends React.Component {

    state = {

        data: [],
        page: 1,
        loading: false,
        searchTerm: 'google'
    }

    static navigationOptions = ({navigation}) => {
        return {
            headerTitle:
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', }}>
                    <Text style={{ fontSize: 30, fontFamily: 'Verdana-Bold', marginTop: -10, }}>Lf Camisas</Text>
                    <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', width: 350, backgroundColor: '#fff', borderRadius: 25, }}>
                        <Icon style={{ paddingLeft: 10, paddingRight: 10 }} name="search" size={20} color="#111" />
                        <TextInput
                            style={{ width: 300, paddingTop: 5, paddingRight: 5, paddingBottom: 5, paddingLeft: 0, backgroundColor: '#fff', color: '#424242' }}
                            placeholder="Encontre a camisa do seu time favorito! =)"
                            placeholderTextColor="#505050"
                            onChangeText={navigation.getParam('setState')}
                            //onEndEditing = {this._setState}
                            underlineColorAndroid="transparent"
                        //value = {this.state.searchTerm}
                        />
                        <TouchableHighlight 
                        onPress={navigation.getParam('searchText')}
                        //onFocus={alert('oi')}
                        underlayColor="white">
                        <View style={{marginLeft:-45}}>
                            <Text style={{}}>Buscar</Text>
                        </View>
                    </TouchableHighlight>
                    </View>
                </View>,
            headerStyle: {
                backgroundColor: '#4169E1',
                height: 80
            },
            headerTintColor: '#111',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'GeezaPro-Bold',
                fontSize: 25
            },
        }
        
    }

    componentWillMount() {
        this.props.navigation.setParams({ searchText: this._searchText });
        this.props.navigation.setParams({ setState: this._setState });
    }

    _searchText = (e) => {

        this.loadRepositories()
    };

    _setState = (e) => {

        //this.setState({ searchTerm: this.props.navigation.state.params.pText});
        this.setState({ searchTerm: e });
    };

    componentDidMount() {
        this.loadRepositories();
    }

    loadRepositories = async () => {
        if (this.state.loading) return;

        const { page } = this.state

        this.setState({ loading: true });

        console.log(this.state.searchTerm)

        if (typeof(this.state.searchTerm) == undefined){
            this.setState({
                searchTerm: ''
            })
        }

        const response = await fetch(`${baseURL}/search/repositories?q=${this.state.searchTerm}&per_page=${perPage}&page=${page}`);
        const repositories = await response.json();

        //console.log(typeof(repositories.items))

        if (repositories.items == undefined){
            repositories.items = this.state.data
        }

        this.setState({
            data: [...this.state.data , ...repositories.items],
            page: page + 1,
            loading: false,
        })
    }

    renderItem = ({ item }) => (
        <View style={styles.listItem}>
            <ImageBackground
                style={{ width: '100%', height: '100%' }}
                source={{ uri: item.owner.avatar_url }}
            />
            <Text>{item.full_name}</Text>
        </View>
    );

    onLayout = () => {
        const { width } = Dimensions.get('window')
        const itemWidth = 180
        const numColumns = Math.floor(width / itemWidth)
        return numColumns
    }

    renderFooter = () => {
        if (!this, this.state.loading) return null;

        return (
            <View style={styles.loading}>
                <ActivityIndicator />
            </View>
        )
    }

    render() {
        return (
            <>
                <FlatList
                    style={{ marginTop: 30 }}
                    contentContainerStyle={styles.list}
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id.toString()}
                    numColumns={this.onLayout()}
                    onEndReached={this.loadRepositories}
                    onEndReachedThreshold={0.3} //carrega mais quando faltar 10% para o fim da pagina
                    ListFooterComponent={this.renderFooter}
                />
            </>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        flexDirection: 'column',
        alignSelf: 'center'
    },

    listItem: {
        //backgroundColor: '#EEE',
        width: 160,
        height: 180,
        margin: 20,
        justifyContent: "center",
        alignItems: 'center'
    },
    loading: {
        alignSelf: 'center',
        marginVertical: 20,
    },

    //HEADER
    headerContainer: {

    },
});
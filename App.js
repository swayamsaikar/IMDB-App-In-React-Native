import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import MyHeader from "./components/header";
import { Input } from "react-native-elements";
import DBIcon from "react-native-vector-icons/MaterialCommunityIcons";
import SearchIcon from "react-native-vector-icons/FontAwesome5";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "peninsula",
      data: "",
      poster_path: "",
    };
  }

  getData = async () => {
    var req = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=6dadf77e35977412f39d2f2aee6b5eb7&query=${this.state.searchText}`
    );
    var res = await req.json();
    this.setState({
      data: res.results[0],
      poster_path: res.results[0].poster_path,
    });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <View>
        <MyHeader title="IMDB App" />
        <View style={styles.container}>
          <Input
            placeholder="Search Movies"
            leftIcon={<DBIcon name="database-search" size={30} color="black" />}
            rightIcon={
              <SearchIcon
                name="search"
                size={25}
                color="#000"
                onPress={() => {
                  this.getData();
                }}
              />
            }
            value={this.state.searchText}
            onChangeText={(text) => {
              this.setState({ searchText: text });
            }}
          />

          {/* Content  */}
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              // backgroundColor: "#000",
              width: "100%",
            }}
          >
            {this.state.data ? (
              <View>
                <View style={{ alignItems: "center" }}>
                  {/* Poster */}

                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500${this.state.poster_path}`,
                    }}
                    style={{ width: 350, height: 200 }}
                  />
                  <Text
                    style={{ fontSize: 20, fontWeight: "bold", margin: 10 }}
                  >
                    {this.state.data.title}
                  </Text>
                </View>

                {/* Details */}
                <View style={styles.movieContentHolder}>
                  <Text style={styles.title}>
                    Movie Title :- {this.state.data.title}
                  </Text>
                  <Text style={styles.title}>
                    Original Language :- {this.state.data.original_language}
                  </Text>

                  <Text style={styles.title}>Description :- </Text>
                  <Text
                    style={{
                      fontSize: 17,
                      marginLeft: 15,
                      paddingHorizontal: 10,
                    }}
                  >
                    {this.state.data.overview}
                  </Text>

                  <Text style={styles.title}>
                    Movie Popularity :- {this.state.data.popularity} million
                  </Text>
                  <Text style={styles.title}>
                    Movie Votes :- {this.state.data.vote_count} votes
                  </Text>
                </View>
              </View>
            ) : (
              <View>
                <Text>No Data</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "90%",
    alignSelf: "center",
    marginTop: "3%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  movieContentHolder: {
    backgroundColor: "#dfe6e9",
    borderRadius: 10,
    borderColor: "#000",
    borderWidth: 0.5,
    height: "55%",
  },
});

import { useNavigation, useRoute } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { api } from "../../services/api";
import {
  BookmarkSimple,
  CalendarBlank,
  CaretLeft,
  Clock,
  Star,
} from "phosphor-react-native";

type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  runtime: string;
  release_date: string;
  vote_average: number;
};

type RouterProps = {
  movieID: number;
};

export function Details() {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const route = useRoute();
  const { movieID } = route.params as RouterProps;

  const navigation = useNavigation();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/movie/${movieID}`);
        setMovieDetails(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieID]);

  function getYear(date: string) {
    const ano = new Date(date).getFullYear();
    return ano;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
        onPress={() => navigation.goBack()}
        >
          <CaretLeft color="#fff" size={32} weight="thin" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Detalhes</Text>
        <TouchableOpacity>
          <BookmarkSimple color="#fff" size={32} weight="thin" />
        </TouchableOpacity>
      </View>
      {loading && <ActivityIndicator size="large" color="#fff" />}
        {!loading && <>
          <View>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieDetails?.backdrop_path}`,
          }}
          style={styles.detailsImage}
        />
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieDetails?.poster_path}`,
          }}
          style={styles.detailsPosterImage}
        />
        <Text style={styles.titleMovie}>{movieDetails?.title}</Text>
        <View style={styles.description}>
          <View style={styles.descriptionGroup}>
            <CalendarBlank color="#92929d" size={25} weight="thin" />
            <Text style={styles.descriptionText}>
              {getYear(movieDetails?.release_date)}
            </Text>
          </View>
          <View style={styles.descriptionGroup}>
            <Clock color="#92929d" size={25} weight="thin" />
            <Text
              style={styles.descriptionText}
            >{`${movieDetails?.runtime} minutos`}</Text>
          </View>
          <View style={styles.descriptionGroup}>
            <Star
              color={
                movieDetails?.vote_average.toFixed(2) >= "7"
                  ? "#ff8700"
                  : "#92929d"
              }
              size={25}
              weight={
                movieDetails?.vote_average.toFixed(2) >= "7"
                  ? "duotone"
                  : "thin"
              }
            />
            <Text
              style={[
                movieDetails?.vote_average.toFixed(2) >= "7"
                  ? styles.descriptionText1
                  : styles.descriptionText,
              ]}
            >
              {movieDetails?.vote_average.toFixed(1)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.about}>
        <Text style={styles.aboutText}>Sinopse</Text>
        <Text style={styles.aboutText}>{movieDetails?.overview}</Text>
      </View>
        </>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e",
  },
  header: {
    paddingTop: 30,
    height: 115,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  headerText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },
  detailsImage: {
    position: "absolute",
    width: "100%",
    height: 210,
  },
  detailsPosterImage: {
    width: 100,
    height: 160,
    borderRadius: 16,
    left: 29,
    right: 251,
    top: 140,
  },
  titleMovie: {
    position: "absolute",
    height: 50,
    left: 140,
    right: 32,
    top: 240,
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    lineHeight: 27,
  },
  description: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 170,
  },
  descriptionGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  descriptionText: {
    marginRight: 10,
    color: "#92929d",
  },
  descriptionText1: {
    marginRight: 10,
    color: "#ff8700",
  },
  about: {
    padding: 20,
  },
  aboutText: {
    color: "#fff",
    textAlign: "justify",
  },
});

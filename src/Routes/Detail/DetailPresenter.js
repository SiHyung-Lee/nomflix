import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import {Link} from "react-router-dom";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height:100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: .5;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 50px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span`

`;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 14px;
  opacity: .7;
  line-height: 1.5;
`;

const TabContainer = styled.ul`
  display: flex;
  margin-top: 50px;
  margin-bottom: 20px;
  
  > li {
      display: inline-block;
      padding: 0 10px;
      :first-child {
        padding-left: 0;
      }
      :last-child {
        padding-right: 0;
      }
  }
  
  button {
    background: none;
    border: none;
    font-size: 14px;
    color: #fff;
  }
`;

const Production = styled.div`
  h4 {
    margin-bottom: 20px;
    font-size: 24px;
  }
  ul {
      display: flex;
      justify-content: left;
  }
  li {
    margin-bottom: 10px;
    margin-right: 10px;
    width: 20%;
  }
  img {
    width: 100%;
  }
`;

const VideoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 50px 0;
`;

const Video = styled.iframe`
  width: calc(33.333% - 10px);
  height: 50%;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const DetailPresenter = ({result, loading, error}) =>
    loading ? (
        <>
            <Helmet>
                <title>Loading | Nomflix</title>
            </Helmet>
            <Loader/>
        </>
    ) : (
        <Container>
            <Helmet>
                <title>
                    {result.original_title ? result.original_title : result.original_name}{" "}
                    | Nomflix
                </title>
            </Helmet>
            <Backdrop
                bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
            />
            <Content>
                <Cover
                    bgImage={
                        result.poster_path
                            ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                            : require("../../assets/noPosterSmall.png")
                    }
                />
                <Data>
                    <Title>
                        {result.original_title
                            ? result.original_title
                            : result.original_name}
                    </Title>
                    <ItemContainer>
                        <Item>
                            {result.release_date
                                ? result.release_date.substring(0, 4)
                                : result.first_air_date.substring(0, 4)}
                        </Item>
                        <Divider>∙</Divider>
                        <Item>
                            {result.runtime
                                ? result.runtime
                                : result.episode_run_time}
                        </Item>
                        <Divider>∙</Divider>
                        <Item>
                            {result.genres &&
                                result.genres.map((genre, index) =>
                                    index === result.genres.length - 1
                                        ? genre.name
                                        : `${genre.name} / `
                            )}
                        </Item>
                    </ItemContainer>
                    <Overview>{result.overview}</Overview>
                    <TabContainer>
                        <li><Link to={`${result.id}/video`}>Video</Link></li>
                    </TabContainer>
                    <Production>
                        <h4>Production Companies</h4>
                        <ul>
                            {result.production_companies.map(company =>
                                <li><img src={`https://image.tmdb.org/t/p/w200${company.logo_path}`} alt={company.name}/></li>
                            )}
                        </ul>
                    </Production>
                    <VideoContainer>
                        {result.videos.results.map(video =>
                            <Video
                                id="ytplayer"
                                type="text/html"
                                src={`https://www.youtube.com/embed/${video.key}`}
                            />
                        )}
                    </VideoContainer>
                </Data>
            </Content>
        </Container>
    );

DetailPresenter.propTypes = {
    result: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
};

export default DetailPresenter;

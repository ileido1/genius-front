import { Typography, Card, CardContent, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import ApiService from '../services/social';
import { SocialData } from '../types';
import { useAuth } from '../context/AuthProvider';

export const Home = () => {
  const [socialData, setSocialData] = useState<SocialData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const auth = useAuth();
  const token = auth.getAccessToken();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); 
        const data = await ApiService.getSocialData(token, currentPage);
        // Si socialData ya tiene datos, anexa los nuevos resultados y suma la información de info
        if (socialData) {
          setSocialData(prevData => ({
            ...prevData,
            results: [...prevData.results, ...data.results],
            info: {
              ...prevData.info,
              total_likes: prevData.info.total_likes + data.info.total_likes,
              total_comments: prevData.info.total_comments + data.info.total_comments,
              total_shares: prevData.info.total_shares + data.info.total_shares,
              sentiment_stats: {
                ...prevData.info.sentiment_stats,
                NEG: prevData.info.sentiment_stats.NEG + data.info.sentiment_stats.NEG,
                NEU: prevData.info.sentiment_stats.NEU + data.info.sentiment_stats.NEU,
                POS: prevData.info.sentiment_stats.POS + data.info.sentiment_stats.POS,
              },
              emotion_stats: {
                ...prevData.info.emotion_stats,
                ...Object.fromEntries(
                  Object.entries(data.info.emotion_stats).map(
                    ([emotion, value]) => [
                      emotion,
                      isNaN(prevData.info.emotion_stats[emotion])
                        ? value
                        : prevData.info.emotion_stats[emotion] + value,
                    ]
                  )
                ),
              },
        
              words_stats: {
                ...prevData.info.words_stats,
                ...Object.fromEntries(
                  Object.entries(data.info.words_stats).map(
                    ([word, value]) => [
                      word,
                      isNaN(prevData.info.words_stats[word])
                        ? value
                        : prevData.info.words_stats[word] + value,
                    ]
                  )
                ),
              },
        
              hashtags_stats: {
                ...prevData.info.hashtags_stats,
                ...Object.fromEntries(
                  Object.entries(data.info.hashtags_stats).map(
                    ([hashtag, value]) => [
                      hashtag,
                      isNaN(prevData.info.hashtags_stats[hashtag])
                        ? value
                        : prevData.info.hashtags_stats[hashtag] + value,
                    ]
                  )
                ),
              },
        
              mentions_stats: {
                ...prevData.info.mentions_stats,
                ...Object.fromEntries(
                  Object.entries(data.info.mentions_stats).map(
                    ([mention, value]) => [
                      mention,
                      isNaN(prevData.info.mentions_stats[mention])
                        ? value
                        : prevData.info.mentions_stats[mention] + value,
                    ]
                  )
                ),
              },
            },
            message: "", // Asegúrate de que message siempre sea una cadena de texto
          }));
        } else {
          // Si socialData está vacío, simplemente establece los nuevos datos
          setSocialData(data);
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
     finally {
        setLoading(false); // Indicar que la carga ha finalizado, ya sea con éxito o con error
      }
    };
    fetchData();
  }, [currentPage]);  
  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      {socialData ? (
        <>
          <Typography variant="h4" gutterBottom>
            Social Dashboard
          </Typography>
          <Typography variant="h6" gutterBottom>
                Overview
              </Typography>
          <div className='container info-social'>
              
              <Typography>
                Total Likes: {socialData.info.total_likes}
              </Typography>
              <Typography>
                Total Comments: {socialData.info.total_comments}
              </Typography>
                <Typography>
                    Total Shares: {socialData.info.total_shares}
                </Typography>
                <div className="div">
                <Typography>
                    Sentiment Stats:
                </Typography>
                <Typography>
                    NEG: {socialData.info.sentiment_stats.NEG}
                </Typography>
                <Typography>
                    NEU: {socialData.info.sentiment_stats.NEU}
                </Typography>
                <Typography>
                    POS: {socialData.info.sentiment_stats.POS}
                   </Typography>
                </div>
              
                <Typography>
                Emotion Stats
              {Object.entries(socialData.info.emotion_stats).map(([emotion, value]) => (
                <Typography key={emotion}>
                  {emotion}: {value}
                </Typography>
              ))}
                </Typography> 
                <Typography>
                Words Stats
                {Object.entries(socialData.info.words_stats).map(([word, value]) => (
                  <Typography key={word}>
                    {word}: {value}
                  </Typography>
                ))} 
                </Typography>
                <Typography>
                Hashtags Stats
                {Object.entries(socialData.info.hashtags_stats).map(([hashtag, value]) => (
                  <Typography key={hashtag}>
                    {hashtag}: {value}
                  </Typography>
                ))}
                </Typography>
                <Typography>
                Mentions Stats
                {Object.entries(socialData.info.mentions_stats).map(([mention, value]) => (
                  <Typography key={mention}>
                    {mention}: {value}
                  </Typography>
                ))}
                </Typography>

            </div>
          <Grid container spacing={3}>
            
          
    
            {socialData.results.map((result, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" gutterBottom>
                      {result.text}
                    </Typography>
                    <Typography>
                      Sentiment: {result.sentiment_label} ({result.sentiment_score})
                    </Typography>
                    <Typography>
                      Emotion: {result.emotion_label} ({result.emotion_score})
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {loading && <p>loading...</p>}
          <button onClick={handleLoadMore} disabled={loading}>
            Load More
          </button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Home;

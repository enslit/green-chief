import React, {useEffect} from 'react';
import {useDispatch} from "react-redux"
import {setAppTitle} from "../redux/actions/appActions"
import Grid from "@material-ui/core/Grid"
import {Typography} from "@material-ui/core"

function Home() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setAppTitle('Главная страница'))
  }, [dispatch])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant={"h4"} component={'h2'}>Тут будет сводка по основным разделам</Typography>
      </Grid>
    </Grid>
  );
}

export default Home;
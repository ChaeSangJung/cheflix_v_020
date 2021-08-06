import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { moviesApi, tvApi } from '../api'
import Loader from './Loader'
import SuperPoster from './SuperPoster'
import Footer from './Footer'

const Container = styled.div`
width:94%;
padding:30px 10px 10px;
margin:auto;
@media screen and (max-width:768px) {
    padding:10px;
    width:100%;
}
`
const Sect = styled.div`
    margin-top:10px;
    display:flex;
    flex-wrap:wrap;
    justify-content:space-around;
    @media screen and (max-width:768px){
    display:grid;
    margin: 10px auto 10px;
    grid-template-columns: repeat(auto-fill,25%);
    grid-gap:0;
    }
`
const Title = styled.p`
    position:relative;
    font-size: 20px;
    padding:0 0 20px;
    font-weight:600;
    @media screen and (max-width:768px) {
        padding:10px 0 5px 5px;
    }
`

const SuperSection = ({ match: { params } }) => {
    const { type, section, search } = params
    const [state, setState] = useState({ loading: true, error: null, resultShows: [], result: [] })
    const [page, setPage] = useState(3)
    const [scroll, setScroll] = useState(false)
    const [title, setTitle] = useState(null)

    useEffect(() => {
        const getData = async () => {
            try {
                if (type === 'movie' && section === 'now') {
                    const { data: { results: movies1 } } = await moviesApi.nowPlaying(1)
                    const { data: { results: movies2 } } = await moviesApi.nowPlaying(2)
                    const movies = [...movies1, ...movies2]
                    setTitle('Now Playing')
                    setState(prev => ({ ...prev, loading: false, result: [...prev.result, ...movies] }))
                    setScroll(false)
                }
                if (type === 'movie' && section === 'up') {
                    const { data: { results: movies1 } } = await moviesApi.upcoming(1)
                    const { data: { results: movies2 } } = await moviesApi.upcoming(2)
                    const movies = [...movies1, ...movies2]
                    setTitle('Upcoming Movies')
                    setState(prev => ({ ...prev, loading: false, result: [...prev.result, ...movies] }))
                    setScroll(false)
                }
                if (type === 'movie' && section === 'popmovie') {
                    const { data: { results: movies1 } } = await moviesApi.popular(1)
                    const { data: { results: movies2 } } = await moviesApi.popular(2)
                    const movies = [...movies1, ...movies2]
                    setTitle('Popular Movies')
                    setState(prev => ({ ...prev, loading: false, result: [...prev.result, ...movies] }))
                    setScroll(false)
                }
                if (type === 'movie' && section === 'search') {
                    const { data: { results: movies1 } } = await moviesApi.search(search, 1)
                    const { data: { results: movies2 } } = await moviesApi.search(search, 2)
                    const movies = [...movies1, ...movies2]
                    setTitle(`Movies by ${search}`)
                    setState(prev => ({ ...prev, loading: false, result: [...prev.result, ...movies] }))
                    setScroll(false)
                }
                if (type === 'show' && section === 'top') {
                    const { data: { results: shows1 } } = await tvApi.topRated(1)
                    const { data: { results: shows2 } } = await tvApi.topRated(2)
                    const shows = [...shows1, ...shows2]
                    setTitle('Top Rated Shows')
                    setState(prev => ({ ...prev, loading: false, resultShows: [...prev.result, ...shows] }))
                    setScroll(false)
                }
                if (type === 'show' && section === 'popshow') {
                    const { data: { results: shows1 } } = await tvApi.popular(1)
                    const { data: { results: shows2 } } = await tvApi.popular(2)
                    const shows = [...shows1, ...shows2]
                    setTitle('Popular TV Shows')
                    setState(prev => ({ ...prev, loading: false, resultShows: [...prev.result, ...shows] }))
                    setScroll(false)
                }
                if (type === 'show' && section === 'air') {
                    const { data: { results: shows1 } } = await tvApi.airingToday(1)
                    const { data: { results: shows2 } } = await tvApi.airingToday(2)
                    const shows = [...shows1, ...shows2]
                    setTitle('Airing Today')
                    setState(prev => ({ ...prev, loading: false, resultShows: [...prev.result, ...shows] }))
                    setScroll(false)
                }
                if (type === 'show' && section === 'search') {
                    const { data: { results: shows1 } } = await tvApi.search(search, 1)
                    const { data: { results: shows2 } } = await tvApi.search(search, 2)
                    const shows = [...shows1, ...shows2]
                    setTitle(`shows by ${search}`)
                    setState(prev => ({ ...prev, loading: false, resultShows: [...prev.resultShows, ...shows] }))
                    setScroll(false)
                }

            } catch (error) {
                setState(prev => ({ ...prev, error: 'error' }))
            }
        }
        getData()
    }, [type, section, search])

    useEffect(() => {
        const getData = async () => {
            try {
                if (type === 'movie' && section === 'now' && scroll) {
                    const { data: { results: movies } } = await moviesApi.nowPlaying(page)
                    setTitle('Now Playing')
                    setState(prev => ({ ...prev, loading: false, result: [...prev.result, ...movies] }))
                    setPage(prev => prev + 1)
                    setScroll(false)
                }
                if (type === 'movie' && section === 'up' && scroll) {
                    const { data: { results: movies } } = await moviesApi.upcoming(page)
                    setTitle('Upcoming Movies')
                    setState(prev => ({ ...prev, loading: false, result: [...prev.result, ...movies] }))
                    setPage(prev => prev + 1)
                    setScroll(false)
                }
                if (type === 'movie' && section === 'popmovie' && scroll) {
                    const { data: { results: movies } } = await moviesApi.popular(page)
                    setTitle('Popular Movies')
                    setState(prev => ({ ...prev, loading: false, result: [...prev.result, ...movies] }))
                    setPage(prev => prev + 1)
                    setScroll(false)
                }
                if (type === 'movie' && section === 'search' && scroll) {
                    const { data: { results: movies } } = await moviesApi.search(search, page)
                    setTitle(`Movies by ${search}`)
                    setState(prev => ({ ...prev, loading: false, result: [...prev.result, ...movies] }))
                    setPage(prev => prev + 1)
                    setScroll(false)
                }
                if (type === 'show' && section === 'top' && scroll) {
                    const { data: { results: shows } } = await tvApi.topRated(page)
                    setTitle('Top Rated Shows')
                    setState(prev => ({ ...prev, loading: false, resultShows: [...prev.resultShows, ...shows] }))
                    setPage(prev => prev + 1)
                    setScroll(false)
                }
                if (type === 'show' && section === 'popshow' && scroll) {
                    const { data: { results: shows } } = await tvApi.popular(page)
                    setTitle('Popular TV Shows')
                    setState(prev => ({ ...prev, loading: false, resultShows: [...prev.resultShows, ...shows] }))
                    setPage(prev => prev + 1)
                    setScroll(false)
                }
                if (type === 'show' && section === 'air' && scroll) {
                    const { data: { results: shows } } = await tvApi.airingToday(page)
                    setTitle('Airing Today')
                    setState(prev => ({ ...prev, loading: false, resultShows: [...prev.resultShows, ...shows] }))
                    setPage(prev => prev + 1)
                    setScroll(false)
                }
                if (type === 'show' && section === 'search' && scroll) {
                    const { data: { results: shows } } = await tvApi.search(search, page)
                    setTitle(`shows by ${search}`)
                    setState(prev => ({ ...prev, loading: false, resultShows: [...prev.resultShows, ...shows] }))
                    setPage(prev => prev + 1)
                    setScroll(false)
                }

            } catch (error) {
                setState(prev => ({ ...prev, error: 'error' }))
            }
        }
        if (scroll)
            getData()
    }, [section, type, scroll, page, search])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 200) {
                if (page < 1000)
                    setScroll(true)
            }
            else {
                return
            }
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [page])

    const { loading, error, result, resultShows } = state
    return (
        loading ? <Loader /> : error ? null : (result || resultShows) &&
            <>
                <Container>
                    <Title>
                        {title}
                    </Title>
                    <Sect>
                        {resultShows && resultShows.length > 0 && resultShows.map(i => <SuperPoster key={i.id} id={i.id} imgUrl={i.poster_path} title={i.original_name} rating={i.vote_average} year={i.first_air_date && i.first_air_date.substring(0, 4)} isMovie={false} />)}
                        {result && result.length > 0 && result.map(i => <SuperPoster key={i.id} id={i.id} imgUrl={i.poster_path} title={i.original_title} rating={i.vote_average} year={i.release_date && i.release_date.substring(0, 4)} isMovie={true} />)}
                    </Sect>
                    <Footer />
                </Container>

            </>
    )
}

export default SuperSection

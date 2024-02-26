import { useState, useEffect } from 'react';
import { invoke } from '@tauri-apps/api';

export const useConfig = () => {
  const [value, setValue] = useState('');
  useEffect(() => {
    getConfig(setValue);
  }, []);
  return {
    value,
    setValue,
  }
}

export const useStatus = () => {
  const [value, setValue] = useState('');
  useEffect(() => {
    getStatus(setValue);
  }, []);

  return {
    value,
    setValue,
  }
}

const getConfig = async (setter) => {
  invoke('get_config').then((res) => {
    setter(JSON.parse(res))
    console.log("Get Config: ", JSON.parse(res).Version);
  }).catch((err) => console.error(err));
}

const getStatus = async (setter) => {
  invoke('get_status').then((res) => {
    setter(res);
    console.log("Get Status: ", res)
  }).catch((err) => console.error(err));
}

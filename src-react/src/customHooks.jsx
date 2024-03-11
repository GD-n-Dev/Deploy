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

export const useBackup = () => {
  const [value, setValue] = useState('');
  useEffect(() => {
    startBackup(setValue);
  }, []);

  return {
    value,
    setValue,
  }
}


const getConfig = async (setter) => {
  invoke('get_directory').then((res) => {
    setter(res)
  }).catch((err) => console.error(err));
}

const getStatus = async (setter) => {
  invoke('get_status').then((res) => {
    setter(res);
  }).catch((err) => console.error(err));
}

const startBackup = async (setter) => {
  invoke('project_backup', {sourcePath: 'c:/test/test.txt', targetPath: 'c:/target/'}).then((res) => {
    setter(res)
  }).catch((err) => console.error(err));
}

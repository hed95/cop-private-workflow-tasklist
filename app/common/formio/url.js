import Promise from 'native-promise-only';


const url = formio => {
  const xhrRequest = (url, name, query, data, options, onprogress) => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const json = (typeof data === 'string');
    const fd = new FormData();
    if (typeof onprogress === 'function') {
      xhr.upload.onprogress = onprogress;
    }

    if (!json) {
      for (const key in data) {
        fd.append(key, data[key]);
      }
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
          // Need to test if xhr.response is decoded or not.
        let respData = {};
        try {
          respData = (typeof xhr.response === 'string') ? JSON.parse(xhr.response) : {};
          respData = (respData && respData.data) ? respData.data : respData;
        } catch (err) {
          respData = {};
        }

          // Get the url of the file.
        let respUrl = respData.hasOwnProperty('url') ? respData.url : `${xhr.responseURL}/${name}`;

          // If they provide relative url, then prepend the url.
        if (respUrl && respUrl[0] === '/') {
          respUrl = `${url}${respUrl}`;
        }
        resolve({ url: respUrl, data: respData });
      } else {
        reject(xhr.response || 'Unable to upload file');
      }
    };

    xhr.onerror = () => reject(xhr);
    xhr.onabort = () => reject(xhr);

    xhr.open('POST', url);
    if (json) {
      xhr.setRequestHeader('Content-Type', 'application/json');
    }
      // Overrides previous request props
    if (options) {
      const parsedOptions = JSON.parse(options);
      xhr.setRequestHeader('Authorization', parsedOptions.Authorization);
    }
    xhr.send(json ? data : fd);
  });

  return {
    title: 'Url',
    name: 'url',
    uploadFile(file, name, dir, progressCallback, url, options) {
      const uploadRequest = () => xhrRequest(url, name, {
      }, {
        file,
        name,
        dir,
      }, options, progressCallback).then(response => {
        response.data = response.data || {};
        return {
          storage: 'url',
          name,
          url: response.url,
          size: file.size,
          type: file.type,
          data: response.data,
        };
      });
      if (file.private && formio.formId) {
        return formio.loadForm().then(form => uploadRequest(form));
      }

      return uploadRequest();
    },
    downloadFile(file) {
      if (file.private) {
        if (formio.submissionId && file.data) {
          file.data.submission = formio.submissionId;
        }
        return xhrRequest(file.url, file.name, {}, JSON.stringify(file)).then(response => response.data);
      }

      // Return the original as there is nothing to do.
      return Promise.resolve(file);
    },
  };
};

url.title = 'Url';

export default url;

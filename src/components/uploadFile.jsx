import React from "react";
import Form from "./common/form";
import { toast } from "react-toastify";
import FileDownload from "js-file-download";
import http from "../Services/httpService";
import InputFile from "./common/inputFile";

class UploadFile extends Form {
  state = {
    file: null,
    filename: "Choose file",
  };

  onChangeHandler = (event) => {
    this.setState({
      file: event.target.files[0],
      filename: event.target.files[0].name,
    });
  };

  ProcessFile = async () => {
    const response = await this.handleFileUpload();
    if (response) this.handleFileDownload(response);
  };

  async handleFileUpload() {
    try {
      const data = new FormData();
      data.append("file", this.state.file);
      const response = await http.post(
        "http://localhost:52265/api/docfile",
        data
      );
      return response;
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error(ex.response.data);
      }
    }
  }

  handleFileDownload(response) {
    const [, filename] = response.headers["content-disposition"].split(
      "filename="
    );
    FileDownload(response.data, filename);
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="offset-md-3 col-md-6">
          <div className="custom-file">
            <InputFile
              name="File"
              onChange={this.onChangeHandler}
              selectedFileName={this.state.filename}
            />
            <button
              disabled={!this.state.file}
              onClick={this.ProcessFile}
              className="btn btn-primary btn-lg btn-block mt-3"
            >
              Process File
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default UploadFile;

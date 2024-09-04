"use client";
import React, { useState } from "react";
import { File, FileVersion } from "@prisma/client";
import Image from "next/image";
import { incrementDownload } from "@/actions/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  File as FileIcon,
  Calendar,
  Package,
  BarChart2,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

type FileWithVersions = File & { versions: FileVersion[] };

interface FileManagerProps {
  initialFiles: FileWithVersions[];
}

const FileManager: React.FC<FileManagerProps> = ({ initialFiles }) => {
  const [files, setFiles] = useState<FileWithVersions[]>(initialFiles);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async (versionId: number) => {
    const result = await incrementDownload(versionId);
    if (result.success) {
      setFiles((prevFiles) =>
        prevFiles.map((file) => ({
          ...file,
          versions: file.versions.map((v) =>
            v.id === versionId ? { ...v, downloads: v.downloads + 1 } : v
          ),
        }))
      );
    } else {
      setError(`Failed to update download count. Error: ${result.error}`);
    }
  };

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const filteredFiles = files.filter(
    (file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRandomColor = () => {
    const colors = [
      "bg-pink-100",
      "bg-purple-100",
      "bg-indigo-100",
      "bg-blue-100",
      "bg-green-100",
      "bg-yellow-100",
      "bg-red-100",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const FileCard = ({ file }: { file: FileWithVersions }) => {
    const [expanded, setExpanded] = useState(false);
    const latestVersion = file.versions[0];
    const cardColor = getRandomColor();

    return (
      <Card
        className={`w-full shadow-lg  transition-all duration-300 hover:shadow-xl`}
      >
        <CardHeader className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              {file.image ? (
                <Image
                  src={file.image}
                  alt={file.name}
                  width={48}
                  height={48}
                  className="rounded-md mr-4"
                />
              ) : (
                <div className="w-12 h-12 rounded-md mr-4 bg-gray-300 flex items-center justify-center">
                  <FileIcon className="w-6 h-6 text-gray-600" />
                </div>
              )}
              <CardTitle className="text-xl text-gray-800">
                {file.name}
              </CardTitle>
            </div>
            <Badge variant="outline" className="bg-purple-500 text-white">
              {file.versions.length} الاصدارات
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="bg-white bg-opacity-60 backdrop-filter backdrop-blur-lg">
          <p className="text-gray-700 mb-4">{file.description}</p>
          <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
            <span className="flex items-center">
              <Calendar className="mr-2 h-4 w-4 text-blue-500" />
              آخر تحديث:{" "}
              {new Date(latestVersion.releaseDate).toLocaleDateString("ar-EG")}
            </span>
            <span className="flex items-center">
              <Package className="mr-2 h-4 w-4 text-green-500" />
              {latestVersion.modloader}
            </span>
            <span className="flex items-center">
              <BarChart2 className="mr-2 h-4 w-4 text-orange-500" />
              {formatNumber(latestVersion.downloads)} تنزيل
            </span>
          </div>
          <div className="flex justify-between items-center">
            <Button
              onClick={() => {
                window.open(latestVersion.url, "_blank");
                handleDownload(latestVersion.id);
              }}
              className="bg-indigo-500 hover:bg-indigo-600 text-white transition-colors duration-300"
            >
              <Download className="mr-2 h-4 w-4" /> تنزيل آخر إصدار
            </Button>
            <Button
              variant="outline"
              onClick={() => setExpanded(!expanded)}
              className="ml-2 border-indigo-300 text-indigo-600 hover:bg-indigo-100 transition-colors duration-300"
            >
              {expanded ? (
                <>
                  <ChevronUp className="mr-2 h-4 w-4" /> إخفاء الإصدارات
                </>
              ) : (
                <>
                  <ChevronDown className="mr-2 h-4 w-4" /> عرض كل الإصدارات
                </>
              )}
            </Button>
          </div>
          {expanded && (
            <div className="mt-4 space-y-4">
              {file.versions.map((version) => (
                <div
                  key={version.id}
                  className="grid grid-cols-5 gap-4 items-center p-3 bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <div className="col-span-2">
                    <p className="font-semibold text-gray-800">
                      الإصدار {version.version}
                    </p>
                    <p className="text-sm text-gray-600">
                      <Calendar className="inline-block mr-1 h-4 w-4 text-blue-500" />
                      {new Date(version.releaseDate).toLocaleDateString(
                        "ar-EG"
                      )}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">
                      <Package className="inline-block mr-1 h-4 w-4 text-blue-500" />
                      {version.modloader}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">
                      <BarChart2 className="inline-block mr-1 h-4 w-4 text-blue-500" />
                      {version.downloads.toLocaleString()} تنزيل
                    </p>
                  </div>
                  <div className="text-right">
                    <Button
                      size="sm"
                      onClick={() => {
                        window.open(version.url, "_blank");
                        handleDownload(version.id);
                      }}
                      className="bg-green-500 hover:bg-green-600 text-white transition-colors duration-300"
                    >
                      <Download className="mr-2 h-4 w-4" /> تنزيل
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen text-gray-800 px-4 sm:px-6 md:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-indigo-800">
          تنزيل المودات
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded-md mb-6">
            {error}
          </div>
        )}

        <div className="mb-8 relative">
          <Input
            placeholder="البحث عن المودات..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 bg-white border border-indigo-300 rounded-lg text-gray-800 pl-12 focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-indigo-400 h-5 w-5" />
        </div>

        <div className="">
          {filteredFiles.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>

        {filteredFiles.length === 0 && (
          <p className="text-center text-gray-600 mt-8">لا توجد نتائج للبحث.</p>
        )}
      </div>
    </div>
  );
};

export default FileManager;
